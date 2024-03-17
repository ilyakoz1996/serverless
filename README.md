This is self-hosted [Simple Pay](https://simplepay.ai) project ready for [`Vercel`](https://vercel.com/) hosting and Vercel Cloud Functions.

## Custom domain setup

First, go to [Vercel dashboard](https://vercel.com)

Add your domain to your uploaded project.

Next, go to Project -> Settings -> Environment Variables
Add new variable with:

```bash
Key: NEXT_PUBLIC_DOMAIN
Value: https://your-new-domain.com
```

After you added NEXT_PUBLIC_DOMAIN env, go to project's deployments tab and redeploy your project.

## REST API:

Check out your REST API documentation on https://your-domain.com/api/docs
