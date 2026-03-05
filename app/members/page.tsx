import Image from 'next/image';
import { getMembersList } from '@/app/_libs/microcms';
import { MEMBERS_LIST_LIMIT } from '@/app/_constants';
import styles from './page.module.css';

export default async function Page() {
  let members: Awaited<ReturnType<typeof getMembersList>>['contents'] = [];
  try {
    const data = await getMembersList({ limit: MEMBERS_LIST_LIMIT });
    members = data.contents;
  } catch (error) {
    console.error('Failed to fetch members list:', error);
  }
  return (
    <div className={styles.container}>
      {members.length === 0 ? (
        <p className={styles.empty}>メンバーが登録されていません。</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id} className={styles.list}>
              <Image
                src={member.image.url}
                alt=""
                width={member.image.width}
                height={member.image.height}
                className={styles.image}
              />
              <dl>
                <dt className={styles.name}>{member.name}</dt>
                <dd className={styles.position}>{member.position}</dd>
                <dd className={styles.profile}>{member.profile}</dd>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
