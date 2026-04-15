# Admin Setup & Article Editor Guide

## Admin Access

### Login Credentials
- **Email**: `harrison@nudgedigital.com.au`
- **Password**: `nudge`

### Access Admin Panel
1. Navigate to `/login` on your website
2. Enter the credentials above
3. You'll be redirected to `/admin` dashboard

### Changing Login Credentials

To change the login credentials, edit the `Login.tsx` file:

```bash
# File location:
client/src/pages/Login.tsx
```

Find this section and update:

```typescript
// Line ~25 in Login.tsx
if (email === 'harrison@nudgedigital.com.au' && password === 'nudge') {
  // Change the email and password here
}
```

**Important**: After changing credentials, rebuild and redeploy the application.

---

## Article Editor

### Creating a New Article

1. Go to `/admin` dashboard
2. Click "New Article" button
3. Fill in the article details:

#### Content Section
- **Title**: Main article headline
- **Excerpt**: Brief summary (appears in resource cards)
- **Content**: Full article body (supports markdown)

#### Tags
- Add relevant tags for categorization
- Press Enter or click "Add" to add each tag
- Click the X to remove a tag

#### SEO Section
- **SEO Title**: Optimized title for search engines (60 chars max)
- **Meta Description**: Description for search results (160 chars max)
- **Keywords**: Comma-separated keywords for SEO

#### Embeds Section
- **Embed Links**: Add relevant external links
- **Embed Videos**: Add YouTube, Vimeo, or other video URLs
- **Embed Social Posts**: Add Instagram, TikTok, LinkedIn post URLs

#### PDF Download (Optional)
- Check "Include PDF download" to enable PDF downloads
- Enter the PDF URL
- Check "Require form to download" if you want to capture leads (name, email, company, phone)

#### Status
- **Draft**: Not visible to public
- **Published**: Immediately visible on Resources page
- **Scheduled**: For future publishing (feature coming soon)

### Publishing Articles

1. Create your article
2. Set Status to "Published"
3. Click "Save Article"
4. Article will appear on the Resources page

### Editing Articles

1. Go to `/admin` dashboard
2. Find the article in the list
3. Click the edit icon (pencil)
4. Make your changes
5. Click "Save Article"

### Deleting Articles

1. Go to `/admin` dashboard
2. Find the article in the list
3. Click the delete icon (trash)
4. Confirm deletion

---

## Resources Page Integration

### How Articles Appear

Published articles automatically appear on the Resources page (`/resources`) in the "Latest Articles" section below the default resources.

### PDF Lead Capture Form

When a user clicks the download button on an article with PDF enabled:

1. If "Require form to download" is checked:
   - A form appears asking for: Name, Email, Company, Phone
   - User submits form
   - PDF downloads automatically

2. If "Require form to download" is unchecked:
   - PDF downloads immediately without form

### Article Tags

Tags are displayed on article cards in the Resources page. They help users categorize and filter content.

---

## Best Practices

### SEO Optimization
- Use descriptive, keyword-rich titles
- Write compelling meta descriptions
- Include relevant keywords naturally in content
- Use proper heading hierarchy in content

### Content Structure
- Start with a clear excerpt
- Use short paragraphs for readability
- Include relevant links and embeds
- Add tags for better categorization

### PDF Downloads
- Use PDF lead capture for valuable resources (guides, templates)
- Don't require forms for every PDF
- Keep forms short (4 fields max)

### Social Sharing
- Articles automatically include social sharing metadata
- SEO title and meta description are used for social previews
- Featured images enhance social sharing (feature coming soon)

---

## Troubleshooting

### Articles Not Appearing
- Check that article status is set to "Published"
- Clear browser cache and refresh
- Check browser console for errors

### PDF Download Not Working
- Verify PDF URL is correct and accessible
- Check that PDF file exists at the URL
- Test the URL in a new browser tab

### Login Not Working
- Clear browser cookies
- Check email and password are exactly correct (case-sensitive)
- Verify you're accessing the correct login page (`/login`)

---

## Data Storage

Articles are stored in browser localStorage. This means:
- Articles persist across browser sessions
- Data is stored locally on your device
- Clearing browser data will delete all articles
- **Backup your articles regularly** by exporting them

### Backing Up Articles

Articles are stored in `localStorage` under the key `articles`. To backup:

1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Find the entry for your domain
4. Copy the `articles` value
5. Save to a text file for backup

---

## Future Enhancements

- Database integration for persistent storage
- Featured image uploads
- Scheduled publishing
- Article analytics
- Comments/discussion
- Related articles
- Social media auto-posting

---

## Support

For issues or questions, contact your developer or refer to the main README.md file.
