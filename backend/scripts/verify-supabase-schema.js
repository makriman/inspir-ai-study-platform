/**
 * Supabase Schema Verification Script
 * Checks all tables and columns needed for the inspir app
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: './.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Define expected schema for the app
const EXPECTED_SCHEMA = {
  // Chat system tables
  chat_conversations: {
    columns: ['id', 'session_id', 'title', 'folder_id', 'is_pinned', 'last_message_at', 'created_at', 'updated_at'],
    description: 'User chat conversations'
  },
  chat_messages: {
    columns: ['id', 'conversation_id', 'role', 'content', 'tokens_used', 'is_flagged', 'flag_reason', 'created_at'],
    description: 'Individual chat messages'
  },
  chat_folders: {
    columns: ['id', 'session_id', 'name', 'color', 'icon', 'created_at', 'updated_at'],
    description: 'Folder organization for chats'
  },

  // SEO Blog system tables
  seo_authors: {
    columns: ['id', 'name', 'bio', 'avatar_url', 'role', 'social_links', 'created_at'],
    description: 'Blog post authors'
  },
  seo_blog_categories: {
    columns: ['id', 'name', 'slug', 'description', 'color', 'icon', 'seo_title', 'seo_description', 'created_at'],
    description: 'Blog post categories'
  },
  seo_blog_tags: {
    columns: ['id', 'name', 'slug', 'created_at'],
    description: 'Blog post tags'
  },
  seo_blog_posts: {
    columns: ['id', 'title', 'slug', 'excerpt', 'content', 'author_id', 'category_id', 'seo_title', 'seo_description', 'seo_keywords', 'status', 'published_at', 'featured', 'views', 'avg_read_time_minutes', 'created_at', 'updated_at'],
    description: 'Blog posts'
  },
  seo_post_tags: {
    columns: ['post_id', 'tag_id', 'created_at'],
    description: 'Many-to-many relationship between posts and tags'
  }
};

async function getAllTables() {
  // Query PostgreSQL information schema to get all tables
  const { data, error } = await supabase.rpc('get_all_tables', {});

  if (error) {
    // If RPC doesn't exist, try direct query approach
    // We'll check each expected table individually
    return null;
  }

  return data;
}

async function checkTableExists(tableName) {
  const { data, error, count } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });

  return !error;
}

async function getTableColumns(tableName) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(1);

  if (error) return null;

  if (data && data.length > 0) {
    return Object.keys(data[0]);
  }

  // If table is empty, we need another approach
  // Try to get column info from error or by inserting/selecting
  return null;
}

async function getTableRowCount(tableName) {
  const { count, error } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });

  if (error) return 0;
  return count || 0;
}

async function verifySchema() {
  console.log('='.repeat(70));
  console.log('SUPABASE SCHEMA VERIFICATION FOR INSPIR APP');
  console.log('='.repeat(70));
  console.log();

  const results = {
    existing: [],
    missing: [],
    errors: []
  };

  // Check each expected table
  for (const [tableName, tableInfo] of Object.entries(EXPECTED_SCHEMA)) {
    console.log(`\n📋 Checking table: ${tableName}`);
    console.log(`   Description: ${tableInfo.description}`);

    const exists = await checkTableExists(tableName);

    if (exists) {
      console.log(`   ✅ Table exists`);

      // Get row count
      const count = await getTableRowCount(tableName);
      console.log(`   📊 Row count: ${count}`);

      // Try to get sample data to verify columns
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (data && data.length > 0) {
        const actualColumns = Object.keys(data[0]);
        const missingColumns = tableInfo.columns.filter(col => !actualColumns.includes(col));
        const extraColumns = actualColumns.filter(col => !tableInfo.columns.includes(col));

        if (missingColumns.length > 0) {
          console.log(`   ⚠️  Missing columns: ${missingColumns.join(', ')}`);
        }

        if (extraColumns.length > 0) {
          console.log(`   ℹ️  Extra columns: ${extraColumns.join(', ')}`);
        }

        if (missingColumns.length === 0 && extraColumns.length === 0) {
          console.log(`   ✅ All expected columns present`);
        }
      } else if (!error) {
        console.log(`   ℹ️  Table is empty, cannot verify columns`);
      }

      results.existing.push({
        name: tableName,
        count,
        description: tableInfo.description
      });
    } else {
      console.log(`   ❌ Table MISSING`);
      results.missing.push({
        name: tableName,
        description: tableInfo.description,
        columns: tableInfo.columns
      });
    }
  }

  // Summary
  console.log('\n');
  console.log('='.repeat(70));
  console.log('SUMMARY');
  console.log('='.repeat(70));
  console.log(`✅ Existing tables: ${results.existing.length}/${Object.keys(EXPECTED_SCHEMA).length}`);
  console.log(`❌ Missing tables: ${results.missing.length}`);

  if (results.existing.length > 0) {
    console.log('\n📊 Existing Tables:');
    results.existing.forEach(table => {
      console.log(`   • ${table.name} (${table.count} rows) - ${table.description}`);
    });
  }

  if (results.missing.length > 0) {
    console.log('\n❌ Missing Tables:');
    results.missing.forEach(table => {
      console.log(`   • ${table.name} - ${table.description}`);
    });
    console.log('\n⚠️  ACTION REQUIRED: Missing tables detected!');
    console.log('   Please run the appropriate schema SQL files:');
    results.missing.forEach(table => {
      if (table.name.startsWith('chat_')) {
        console.log(`   - database-schema.sql (for ${table.name})`);
      } else if (table.name.startsWith('seo_')) {
        console.log(`   - database-seo-schema.sql (for ${table.name})`);
      }
    });
  } else {
    console.log('\n🎉 All required tables are present!');
  }

  // Additional checks
  console.log('\n');
  console.log('='.repeat(70));
  console.log('ADDITIONAL CHECKS');
  console.log('='.repeat(70));

  // Check for sample data in key tables
  if (results.existing.find(t => t.name === 'seo_blog_posts')) {
    const postsCount = results.existing.find(t => t.name === 'seo_blog_posts').count;
    if (postsCount === 0) {
      console.log('⚠️  Warning: seo_blog_posts table is empty');
      console.log('   Consider running: node scripts/seed-blog-posts.js');
    } else {
      console.log(`✅ Blog posts populated: ${postsCount} posts`);
    }
  }

  if (results.existing.find(t => t.name === 'seo_authors')) {
    const authorsCount = results.existing.find(t => t.name === 'seo_authors').count;
    if (authorsCount === 0) {
      console.log('⚠️  Warning: seo_authors table is empty');
    } else {
      console.log(`✅ Authors populated: ${authorsCount} authors`);
    }
  }

  if (results.existing.find(t => t.name === 'seo_blog_categories')) {
    const categoriesCount = results.existing.find(t => t.name === 'seo_blog_categories').count;
    if (categoriesCount === 0) {
      console.log('⚠️  Warning: seo_blog_categories table is empty');
    } else {
      console.log(`✅ Categories populated: ${categoriesCount} categories`);
    }
  }

  console.log('\n' + '='.repeat(70));

  return results;
}

// Run verification
verifySchema().catch(console.error);
