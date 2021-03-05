import Head from "next/head";
import Form from "../components/Form/Form";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col pt-20 items-center h-screen">
        <Form />
      </main>
    </div>
  );
};

export default Home;
