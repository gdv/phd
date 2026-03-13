// 1. Get and Sort Files
const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    // Reverse alphabetical sort (Z to A / Newest Date to Oldest)
    .sort((a, b) => b.localeCompare(a));

// 2. Map to HTML
const listItems = files.map(file => {
    const slug = file.replace('.md', '');
    // Clean up display name: remove date prefix and dashes
    const displayName = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ');

    return `
    <li>
        <a href="viewer.html?deck=${slug}">${displayName}</a>
    </li>`;
}).join('\n');

// 3. Build the Page
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presentations</title>
    <style>
        body { font-family: system-ui, sans-serif; line-height: 1.5; max-width: 600px; margin: 3rem auto; padding: 0 1rem; background: #f4f4f9; }
        h1 { border-bottom: 2px solid #ddd; padding-bottom: 0.5rem; }
        ul { list-style: none; padding: 0; }
        li { background: white; margin: 0.5rem 0; padding: 1rem; border-radius: 8px; shadow: 0 2px 4px rgba(0,0,0,0.1); transition: transform 0.1s; }
        li:hover { transform: translateX(5px); }
        a { text-decoration: none; color: #2563eb; font-weight: 600; text-transform: capitalize; display: block; }
    </style>
</head>
<body>
    <h1>My Decks</h1>
    <ul>${listItems}</ul>
</body>
</html>`;

fs.writeFileSync('index.html', html);
console.log(`✅ Index generated with ${files.length} presentations.`);

