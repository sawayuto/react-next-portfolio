import { client } from "../../lib/microcms";

export default async function Profile() {

  const data = await client.get({

    endpoint: "profile",

    contentId: "2qtbjt0rs",

  });

  return (
<main style={{ padding: "40px", fontFamily: "sans-serif" }}>
<h1>プロフィール</h1>
<p>名前: {data.name}</p>
<p>学校: {data.school}</p>
<p>学年: {data.grade}</p>
<p>趣味: {data.hobby}</p>
<h2>自己紹介</h2>
<p>{data.introduction}</p>
</main>

  );

}
 