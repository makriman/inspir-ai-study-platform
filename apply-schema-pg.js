import pg from 'pg';
import fs from 'fs';

const { Client } = pg;

// Supabase connection details
// Format: postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
import 'dotenv/config';

const PROJECT_REF = 'ksdnbkxixbywurohugkx';
const DB_PASSWORD = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!DB_PASSWORD) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required.');
  process.exit(1);
}

// Try different connection approaches
const connectionStrings = [
  // Try with service role key as password (sometimes works)
  `postgresql://postgres:${DB_PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres`,
  // Try pooler connection
  `postgresql://postgres:${DB_PASSWORD}@aws-0-eu-west-2.pooler.supabase.com:5432/postgres`
];

async function tryConnection(connectionString, index) {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

  try {
    console.log(`\n🔌 Trying connection method ${index + 1}...`);
    await client.connect();
    console.log('✅ Connected successfully!');

    // Read SQL schema
    const sqlSchema = fs.readFileSync('/root/inspir/auth-schema.sql', 'utf8');
    console.log(`📖 Loaded SQL schema (${sqlSchema.length} characters)`);

    // Execute the schema
    console.log('⚙️  Executing schema...');
    await client.query(sqlSchema);

    console.log('✅ Schema applied successfully!');
    await client.end();
    return true;

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);

    if (error.code === 'ENOTFOUND') {
      console.error('   Host not found. Trying next connection method...');
    } else if (error.code === '28P01') {
      console.error('   Authentication failed. Need actual database password.');
    } else if (error.message.includes('already exists')) {
      console.log('   ⚠️  Some objects already exist (this is OK)');
    } else {
      console.error(`   Error code: ${error.code}`);
    }

    try {
      await client.end();
    } catch (e) {
      // Ignore cleanup errors
    }
    return false;
  }
}

async function main() {
  console.log('🚀 Attempting to connect to Supabase PostgreSQL database...\n');

  for (let i = 0; i < connectionStrings.length; i++) {
    const success = await tryConnection(connectionStrings[i], i);
    if (success) {
      console.log('\n🎉 Schema application completed!');
      process.exit(0);
    }
  }

  console.log('\n❌ All connection methods failed.');
  console.log('\n💡 You need the actual database password from Supabase Dashboard:');
  console.log('   1. Go to https://supabase.com/dashboard/project/' + PROJECT_REF);
  console.log('   2. Go to Settings → Database');
  console.log('   3. Copy the "Connection string" under "Connection pooling"');
  console.log('   4. The password is in the connection string');
  console.log('\n   OR use the SQL Editor in the Supabase Dashboard:');
  console.log('   1. Go to SQL Editor');
  console.log('   2. Paste the contents of /root/inspir/auth-schema.sql');
  console.log('   3. Click "Run"');

  process.exit(1);
}

main();
