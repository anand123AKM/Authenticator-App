import Head from 'next/head';
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </div>
  );
}