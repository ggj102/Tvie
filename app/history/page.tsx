import { getSession } from "@auth0/nextjs-auth0";

import HistoryList from "./components/historyList";

import historyStyles from "@styles/pages/history/history.module.scss";

async function ServerSideProps() {
  const isSession = await getSession();

  return { isSession: !!isSession?.user };
}

export default async function HistoryPage() {
  const { isSession } = await ServerSideProps();

  return (
    <div className={historyStyles.history_container}>
      <div className={historyStyles.history_title}>히스토리</div>
      <HistoryList isSession={isSession} />
    </div>
  );
}
