import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupDatabase() {
  console.log('🔧 Setting up Supabase database...');

  try {
    // Read the schema file
    const schema = fs.readFileSync('../database-schema.sql', 'utf8');

    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`[${i + 1}/${statements.length}] Executing: ${statement.substring(0, 60)}...`);

      try {
        // Execute via RPC or direct SQL
        const { data, error } = await supabase.rpc('exec_sql', {
          sql: statement + ';'
        });

        if (error) {
          // Try alternative method - using the REST API
          console.log('   ⚠️  RPC method failed, statement might need manual execution');
        } else {
          console.log('   ✅ Success');
        }
      } catch (err) {
        console.log(`   ⚠️  ${err.message}`);
      }
    }

    console.log('\n✅ Database setup complete!');
    console.log('\nℹ️  If you see warnings above, you may need to:');
    console.log('   1. Go to https://supabase.com/dashboard');
    console.log('   2. Open your project: ksdnbkxixbywurohugkx');
    console.log('   3. Go to SQL Editor');
    console.log('   4. Copy and paste the contents of database-schema.sql');
    console.log('   5. Click "Run"');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
