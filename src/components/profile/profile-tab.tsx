import ParamTab from '@/components/ui/param-tab';
import ListCard from '@/components/ui/list-card';
import { TabPanel } from '@/components/ui/tab';
import VoteList from '@/components/vote/vote-list';
import { authorWallets } from '@/data/static/author-profile';

export default function ProfileTab() {
  return (
    <ParamTab
      tabMenu={[
        {
          title: 'Proposals',
          path: 'collection',
        },
        {
          title: 'Funds',
          path: 'portfolio',
        },
      ]}
    >
      <TabPanel className="focus:outline-none">
        <VoteList voteStatus={'active'} />
      </TabPanel>
      <TabPanel className="focus:outline-none">
        <div className="space-y-8 md:space-y-10 xl:space-y-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {authorWallets?.map((wallet) => (
              <ListCard item={wallet} key={wallet?.id} variant="medium" />
            ))}
          </div>
        </div>
      </TabPanel>
    </ParamTab>
  );
}
