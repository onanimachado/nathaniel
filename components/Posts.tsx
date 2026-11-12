import Image from "next/image";
import { posts, contact } from "@/content/site";
import s from "./Posts.module.css";

export default function Posts() {
  return (
    <section className={s.posts} aria-labelledby="posts-title">
      <div className="wrap">
        <div className="head2">
          <h2 className="serif" id="posts-title">Na sua tela</h2>
          <p>
            O que sai no feed, do jeito que sai no feed.{" "}
            {contact.instagram ?? <span className="todo">@ a definir</span>}
          </p>
        </div>
        <div className={s.row}>
          {posts.map((p, i) => (
            <div key={p.image} data-parallax={[40, -30, 70][i % 3]}>
              <Image src={p.image} alt={p.alt} width={486} height={595} sizes="(max-width: 700px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
