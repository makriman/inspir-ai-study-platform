import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ksdnbkxixbywurohugkx.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  db: { schema: 'public' },
  auth: { persistSession: false }
});

async function executeRawSQL(sql) {
  try {
    // Try using Supabase's SQL execution via postgrest
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'params=single-object'
      },
      body: JSON.stringify({ sql })
    });

    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

async function checkIfTablesExist() {
  console.log('🔍 Checking if authentication tables already exist...\n');

  const tables = ['parent_accounts', 'student_accounts', 'team_members', 'password_reset_tokens'];
  let existingTables = [];

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1);

      if (!error) {
        existingTables.push(table);
        console.log(`   ✅ ${table} - EXISTS`);
      } else if (error.code === '42P01') {
        console.log(`   ❌ ${table} - NOT FOUND`);
      } else {
        console.log(`   ⚠️  ${table} - ${error.message}`);
      }
    } catch (e) {
      console.log(`   ❌ ${table} - ERROR: ${e.message}`);
    }
  }

  return existingTables;
}

async function main() {
  console.log('🚀 Supabase Authentication Schema Setup\n');
  console.log('=' .repeat(60) + '\n');

  const existingTables = await checkIfTablesExist();

  if (existingTables.length === 4) {
    console.log('\n✅ All authentication tables already exist!');
    console.log('   No schema application needed.\n');
    return;
  }

  console.log('\n❌ Some or all tables are missing. Schema needs to be applied.\n');
  console.log('=' .repeat(60));
  console.log('📋 MANUAL STEPS REQUIRED:\n');
  console.log('Unfortunately, Supabase doesn\'t allow arbitrary SQL execution');
  console.log('via the REST API for security reasons.\n');
  console.log('Please follow these steps to apply the schema:\n');
  console.log('1. Open your browser and go to:');
  console.log('   https://supabase.com/dashboard/project/ksdnbkxixbywurohugkx/sql/new\n');
  console.log('2. Copy the entire contents of:');
  console.log('   /root/inspir/auth-schema.sql\n');
  console.log('3. Paste it into the SQL Editor');
  console.log('4. Click the "RUN" button\n');
  console.log('=' .repeat(60));
  console.log('\n💡 Quick copy command:');
  console.log('   cat /root/inspir/auth-schema.sql\n');
}

main();
