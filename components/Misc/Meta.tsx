import Head from "next/head";

interface MetaProps {
  title?: string;
}

const Meta: React.FunctionComponent<MetaProps> = ({ title }) => {
  return (
    <div>
      <Head>
        <title>{title ? `Profeed - ${title}` : "Profeed"}</title>
        <meta
          name="description"
          content="Profeed is a one-stop platform to interact and get feedback from your users"
        />
      </Head>
    </div>
  );
};

export default Meta;
