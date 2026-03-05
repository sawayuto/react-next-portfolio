import { getNewsList } from '@/app/_libs/microcms';
import NewsList from '@/app/_components/NewsList';
import Pagination from '@/app/_components/Pagination';
import SearchField from '@/app/_components/SearchField';
import { NEWS_LIST_LIMIT } from '@/app/_constants';

export default async function Page() {
  let news: Awaited<ReturnType<typeof getNewsList>>['contents'] = [];
  let totalCount = 0;
  try {
    const data = await getNewsList({
      limit: NEWS_LIST_LIMIT,
    });
    news = data.contents;
    totalCount = data.totalCount;
  } catch (error) {
    console.error('Failed to fetch news list:', error);
  }

  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagination totalCount={totalCount} />
    </>
  );
}
