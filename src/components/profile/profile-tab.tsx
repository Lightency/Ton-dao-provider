import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import ListCard from '@/components/ui/list-card';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
// static data
import { collections } from '@/data/static/collections';
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';
import LiquidityChart from '../ui/chats/liquidity-chart';
import VolumeChart from '../ui/chats/volume-chart';

export default function ProfileTab() {
  return (
    <ParamTab
      tabMenu={[
        {
          title: 'Statistique',
          path: 'collection',
        },
        {
          title: 'Funds',
          path: 'portfolio',
        },
       
      ]}
    >
      <TabPanel className="focus:outline-none">
      <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
        <LiquidityChart />
        <VolumeChart />
      </div>
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
