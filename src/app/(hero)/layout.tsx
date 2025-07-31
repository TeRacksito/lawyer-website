import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/classic/Header";

export interface IHeroLayoutProps {
  children: React.ReactNode;
}

export default function HeroLayout(props: IHeroLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{props.children}</main>
      <Footer dataTheme="dark" />
    </>
  );
}
