Every time after database schema change 
```bash
pnpm exec drizzle-kit push
pnpm exec drizzle-kit generate
pnpm exec drizzle-kit migrate // should be a fresh db
```

For better-auth database schema generation, it will generate in a file
```bash
pnpm dlx @better-auth/cli generate
```
