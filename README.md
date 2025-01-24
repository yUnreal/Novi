![](/assets/logo.png)

<h1 align="center">New to Novi</h1>
<p align="center">The best way to validate your data without complexity. Validate massive data at scale.</p>

<!-- <h2 align="center">End-to-End Type Safety</h2>
<p align="center">Use safe, correct and easy typing from your schema, removing any type of complexity.</p> -->

<h2 align="center">Integrate now</h2>
<p align="center">An elegant and ergonomic interface for users. Write as if it were your Zod schemes.</p>

```ts
import { n } from 'novi'

const strSchema = n.string();

strSchema.parse('Is this safe?')
```
<h2 align="center">End-to-End Type Safety</h2>
<p align="center">Our goal is to make types better than any other schema library we've ever used. So we did Novi.</p>

```ts
const User = n.object({
    name: n.string(),
    profile: n.string().url(),
    children: n.record(n.string(), n.integer()),
});

/**
 * type User = {
 *      name: string;
 *      profile: string;
 *      children: Record<string, number>;
 * }; 
 **/
type User = n.type<typeof User>;
```

<h2 align="center">Build the future<br>with us</br></h2>
<p align="center">Novi is not owned by any company or organization, but by its users. <br>Contribute to make Novi better.</br><br><a href="https://github.com/yUnreal/novi">Go to Gihub</a></br></p>

<h2 align="center">Schemas reimagined.<br>Use Novi.</br></h2>

<p align="center">
  <a href="https://novijs.vercel.app">Go to Website</a>
</p>

<p align="center">Made with 🧡 for you.</p>
