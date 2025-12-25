/**
 * Comprehensive Supabase Schema Check
 * Verifies ALL tables needed for the inspir app
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: './.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ALL_REQUIRED_TABLES = [
  // Chat system (from database-schema.sql)
  { name: 'chat_conversations', category: 'Chat System', file: 'database-schema.sql' },
  { name: 'chat_messages', category: 'Chat System', file: 'database-schema.sql' },
  { name: 'chat_folders', category: 'Chat System', file: 'database-schema.sql' },

  // SEO Blog system (from database-seo-schema.sql)
  { name: 'seo_authors', category: 'Blog System', file: 'database-seo-schema.sql' },
  { name: 'seo_blog_categories', category: 'Blog System', file: 'database-seo-schema.sql' },
  { name: 'seo_blog_tags', category: 'Blog System', file: 'database-seo-schema.sql' },
  { name: 'seo_blog_posts', category: 'Blog System', file: 'database-seo-schema.sql' },
  { name: 'seo_blog_post_tags', category: 'Blog System', file: 'database-seo-schema.sql' },

  // Tool pages (from database-seo-schema.sql)
  { name: 'seo_tool_pages', category: 'Tool System', file: 'database-seo-schema.sql' },

  // Static pages & metadata (from database-seo-schema.sql)
  { name: 'seo_static_pages', category: 'SEO/Static', file: 'database-seo-schema.sql' },
  { name: 'seo_metadata', category: 'SEO/Static', file: 'database-seo-schema.sql' },
  { name: 'seo_redirects', category: 'SEO/Static', file: 'database-seo-schema.sql' }
];

async function checkTable(tableName) {
  const { data, error, count } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });

  if (error) {
    return { exists: false, count: 0, error: error.message };
  }

  return { exists: true, count: count || 0 };
}

async function comprehensiveCheck() {
  console.log('╔' + '═'.repeat(78) + '╗');
  console.log('║' + ' '.repeat(18) + 'INSPIR DATABASE COMPREHENSIVE CHECK' + ' '.repeat(25) + '║');
  console.log('╚' + '═'.repeat(78) + '╝');
  console.log();

  const results = {
    chatSystem: { total: 0, existing: 0, missing: [] },
    blogSystem: { total: 0, existing: 0, missing: [] },
    toolSystem: { total: 0, existing: 0, missing: [] },
    seoStatic: { total: 0, existing: 0, missing: [] }
  };

  // Group by category
  const categories = {
    'Chat System': [],
    'Blog System': [],
    'Tool System': [],
    'SEO/Static': []
  };

  // Check each table
  for (const table of ALL_REQUIRED_TABLES) {
    const result = await checkTable(table.name);
    categories[table.category].push({ ...table, ...result });
  }

  // Display results by category
  for (const [category, tables] of Object.entries(categories)) {
    console.log(`\n┌─ ${category} ${'─'.repeat(70 - category.length)}`);

    for (const table of tables) {
      if (table.exists) {
        const countStr = table.count > 0 ? `${table.count} rows` : 'empty';
        console.log(`│  ✅ ${table.name.padEnd(30)} (${countStr})`);

        // Update stats
        if (category === 'Chat System') {
          results.chatSystem.total++;
          results.chatSystem.existing++;
        } else if (category === 'Blog System') {
          results.blogSystem.total++;
          results.blogSystem.existing++;
        } else if (category === 'Tool System') {
          results.toolSystem.total++;
          results.toolSystem.existing++;
        } else if (category === 'SEO/Static') {
          results.seoStatic.total++;
          results.seoStatic.existing++;
        }
      } else {
        console.log(`│  ❌ ${table.name.padEnd(30)} MISSING`);
        console.log(`│     └─ Create with: ${table.file}`);

        // Update stats
        if (category === 'Chat System') {
          results.chatSystem.total++;
          results.chatSystem.missing.push(table);
        } else if (category === 'Blog System') {
          results.blogSystem.total++;
          results.blogSystem.missing.push(table);
        } else if (category === 'Tool System') {
          results.toolSystem.total++;
          results.toolSystem.missing.push(table);
        } else if (category === 'SEO/Static') {
          results.seoStatic.total++;
          results.seoStatic.missing.push(table);
        }
      }
    }
    console.log('└' + '─'.repeat(78));
  }

  // Overall summary
  const totalTables = ALL_REQUIRED_TABLES.length;
  const totalExisting = results.chatSystem.existing + results.blogSystem.existing +
                        results.toolSystem.existing + results.seoStatic.existing;
  const totalMissing = results.chatSystem.missing.length + results.blogSystem.missing.length +
                       results.toolSystem.missing.length + results.seoStatic.missing.length;

  console.log('\n');
  console.log('╔' + '═'.repeat(78) + '╗');
  console.log('║' + ' '.repeat(32) + 'OVERALL SUMMARY' + ' '.repeat(31) + '║');
  console.log('╠' + '═'.repeat(78) + '╣');
  console.log(`║  Total Tables Required: ${totalTables.toString().padEnd(56)} ║`);
  console.log(`║  ✅ Existing: ${totalExisting.toString().padEnd(63)} ║`);
  console.log(`║  ❌ Missing:  ${totalMissing.toString().padEnd(63)} ║`);
  console.log('╠' + '═'.repeat(78) + '╣');
  console.log(`║  Chat System:    ${results.chatSystem.existing}/${results.chatSystem.total} ${' '.repeat(59)} ║`);
  console.log(`║  Blog System:    ${results.blogSystem.existing}/${results.blogSystem.total} ${' '.repeat(59)} ║`);
  console.log(`║  Tool System:    ${results.toolSystem.existing}/${results.toolSystem.total} ${' '.repeat(59)} ║`);
  console.log(`║  SEO/Static:     ${results.seoStatic.existing}/${results.seoStatic.total} ${' '.repeat(59)} ║`);
  console.log('╚' + '═'.repeat(78) + '╝');

  // Status message
  console.log();
  if (totalMissing === 0) {
    console.log('🎉 SUCCESS! All required tables are present in the database.');
    console.log('✅ Your inspir app database schema is complete and ready to use.');
  } else {
    console.log('⚠️  ACTION REQUIRED: Missing tables detected!');
    console.log();
    console.log('To fix, run these SQL files in Supabase SQL Editor:');

    const missingFiles = new Set();
    [...results.chatSystem.missing, ...results.blogSystem.missing,
     ...results.toolSystem.missing, ...results.seoStatic.missing]
      .forEach(table => missingFiles.add(table.file));

    missingFiles.forEach(file => {
      console.log(`  📄 ${file}`);
    });
  }

  // Data completeness check
  console.log();
  console.log('╔' + '═'.repeat(78) + '╗');
  console.log('║' + ' '.repeat(27) + 'DATA COMPLETENESS CHECK' + ' '.repeat(28) + '║');
  console.log('╚' + '═'.repeat(78) + '╝');
  console.log();

  // Check key tables for data
  const dataChecks = [
    { table: 'seo_blog_posts', expected: '> 0', name: 'Blog Posts' },
    { table: 'seo_authors', expected: '≥ 3', name: 'Authors' },
    { table: 'seo_blog_categories', expected: '≥ 12', name: 'Blog Categories' },
    { table: 'seo_blog_tags', expected: '≥ 30', name: 'Blog Tags' },
    { table: 'seo_tool_pages', expected: '= 15', name: 'Tool Pages' }
  ];

  for (const check of dataChecks) {
    const tableResult = categories['Blog System'].find(t => t.name === check.table) ||
                       categories['Tool System'].find(t => t.name === check.table);

    if (tableResult && tableResult.exists) {
      let status = '✅';
      let message = `${tableResult.count} rows`;

      if (check.table === 'seo_blog_posts' && tableResult.count === 0) {
        status = '⚠️ ';
        message += ' - Run: node scripts/seed-blog-posts.js';
      } else if (check.table === 'seo_tool_pages' && tableResult.count !== 15) {
        status = '⚠️ ';
        message += ' - Run seed-tools.sql in Supabase';
      }

      console.log(`${status} ${check.name.padEnd(20)} Expected: ${check.expected.padEnd(8)} Actual: ${message}`);
    }
  }

  console.log();
  console.log('─'.repeat(80));
}

comprehensiveCheck().catch(console.error);
