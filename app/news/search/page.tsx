import { getNewsList } from '@/app/_libs/microcms';
import { NEWS_LIST_LIMIT } from '@/app/_constants';
import NewsList from '@/app/_components/NewsList';
import SearchField from '@/app/_components/SearchField';

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const query = searchParams.q?.trim();
  const news = query
    ? (
        await getNewsList({
          limit: NEWS_LIST_LIMIT,
          q: query,
        })
      ).contents
    : [];

  return (
    <>
      <SearchField />
      <NewsList news={news} />
    </>
  );
}
