import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import NavBar from "../components/NavBar.tsx";

type PageProps = {
  title: string;
  children: ComponentChildren;
};

export default function Page(props: PageProps) {
  const { title } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div class="flex flex-col min-h-screen w-full">
        <NavBar />
        <main class="mt-2 max-w-4xl w-full self-center">{props.children}</main>
      </div>
    </>
  );
}
