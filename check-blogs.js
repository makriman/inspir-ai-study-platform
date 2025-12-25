const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ksdnbkxixbywurohugkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZG5ia3hpeGJ5d3Vyb2h1Z2t4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjE0NDQ5NywiZXhwIjoyMDgxNzIwNDk3fQ.wPsceDO3tTGXacwBipTYIMsmBD2W4ZHXjjDZk_pQ5NY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBlogs() {
  console.log('Checking blog posts...\n');

  // Check blog posts
  const { data: posts, error: postsError } = await supabase
    .from('seo_blog_posts')
    .select('id, title, slug, published, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  if (postsError) {
    console.error('Error fetching posts:', postsError);
  } else {
    console.log(`Found ${posts.length} blog posts:`);
    posts.forEach(post => {
      console.log(`  - ${post.title} (${post.slug}) - Published: ${post.published}`);
    });
  }

  console.log('\n\nChecking categories...\n');

  // Check categories
  const { data: categories, error: catError } = await supabase
    .from('seo_blog_categories')
    .select('id, name, slug');

  if (catError) {
    console.error('Error fetching categories:', catError);
  } else {
    console.log(`Found ${categories.length} categories:`);
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.slug})`);
    });
  }

  console.log('\n\nChecking authors...\n');

  // Check authors
  const { data: authors, error: authError } = await supabase
    .from('seo_authors')
    .select('id, name, slug');

  if (authError) {
    console.error('Error fetching authors:', authError);
  } else {
    console.log(`Found ${authors.length} authors:`);
    authors.forEach(author => {
      console.log(`  - ${author.name} (${author.slug})`);
    });
  }
}

checkBlogs().then(() => process.exit(0));
