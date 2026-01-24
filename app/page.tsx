import styles from './page.module.css'
import Image from 'next/image'

import { getNewsList } from '@/app/_libs/microcms'
import { TOP_NEWS_LIMIT } from '@/app/_constants'
import NewsList from '@/app/_components/NewsList'
import ButtonLink from '@/app/_components/ButtonLink'

export const revalidate = 60

export default async function Home() {
  let news: Awaited<ReturnType<typeof getNewsList>>['contents'] = []
  try {
    const data = await getNewsList({
      limit: TOP_NEWS_LIMIT,
    })
    news = data.contents
  } catch (error) {
    console.error('Failed to fetch news list on Home:', error)
  }
  return (
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>テクノロジーの力で世界を変える</h1>
          <p className={styles.description}>
            私たちは市場をリードしているグローバルテックカンパニーです。
          </p>
        </div>
        <Image
          className={styles.bgimg}
          src="/img-mv.jpg"
          alt=""
          width={4000}
          height={1200}
          priority
          sizes="100vw"
        />
      </section>
      <section className={styles.news}>
        <h2 className={styles.newsTitle}>News</h2>
        <NewsList news={news} />
        <div className={styles.newsLink}>
          <ButtonLink href="/news">もっとみる</ButtonLink>
        </div>
      </section>
    </>
  )
}
