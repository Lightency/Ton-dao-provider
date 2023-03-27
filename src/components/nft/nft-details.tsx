import { StaticImageData } from 'next/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import Avatar from '@/components/ui/avatar';
import { NextSeo } from 'next-seo';
import DaoList from '@/components/dao/dao-list';
import routes from '@/config/routes';
import { ExportIcon } from '@/components/icons/export-icon';
import { useRouter } from 'next/router';
import votePool from '@/assets/images/vote-pool.svg';
import { daos } from '@/data/static/dao-data';

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};
type NftDetailsProps = {
  isAuction?: boolean;
  image: StaticImageData;
  name: string;
  description: string;
  minted_date: string;
  minted_slug: string;
  price: number;
  creator: Avatar;
  collection: Avatar;
  owner: Avatar;
  block_chains: Avatar[];
};

export default function NftDetails({ product }: { product: NftDetailsProps }) {
  const router = useRouter();
  function goToCreateDAOPage() {
    setTimeout(() => {
      router.push(routes.createNft);
    }, 800);
  }
  return (
    <>
      <NextSeo
        title="DAO's"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <section className="mx-auto w-full max-w-[1160px] text-sm sm:pt-10 4xl:pt-14">
        <header className="mb-8 flex flex-col gap-4 rounded-lg bg-white p-5 py-6 shadow-card dark:bg-light-dark xs:p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 xs:items-center xs:gap-3 xl:gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-dark">
              <Image alt="Vote Pool" src={votePool} width={32} height={32} />
            </div>
            <div>
              <h2 className="mb-2 text-base font-medium uppercase dark:text-gray-100 xl:text-lg">
                You have {daos.length} DAO's
              </h2>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                You need CRIPTIC or CRIPTIC tokens to participate in governance.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Button
              shape="rounded"
              fullWidth={true}
              className="uppercase"
              onClick={() => goToCreateDAOPage()}
            >
              Create DAO
            </Button>
          </div>
        </header>
        <ParamTab
          tabMenu={[
            {
              title: (
                <>
                  ALL my DAO's{' '}
                  {daos.length > 0 && (
                    <span className="ltr:ml-0.5 rtl:mr-0.5 ltr:md:ml-1.5 rtl:md:mr-1.5 ltr:lg:ml-2 rtl:lg:mr-2">
                      {daos.length}
                    </span>
                  )}
                </>
              ),
              path: 'active',
            },
          ]}
        >
          <TabPanel className="focus:outline-none">
            <DaoList />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <>
              <div className="mb-6 rounded-lg border-2 border-gray-900 bg-white p-5 dark:border-gray-700 dark:bg-light-dark xs:py-6 lg:px-8 lg:py-6">
                <div className="mb-3 flex flex-col gap-3 xs:mb-4 sm:gap-4 md:flex-row md:items-center md:justify-between">
                  <h3 className="flex items-center gap-4 text-base font-semibold dark:text-gray-100">
                    <span className="inline-block rounded-3xl bg-gray-900 px-2.5 py-0.5 text-sm font-medium text-white">
                      Tip
                    </span>{' '}
                    Vote gas-free + earn rewards
                  </h3>
                  <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://snapshot.org/#/"
                      className="inline-flex items-center gap-2 text-gray-900 transition-opacity duration-200 hover:underline hover:opacity-90 dark:text-gray-100"
                    >
                      Go to Snapshot <ExportIcon className="h-auto w-3" />
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="#"
                      className="inline-flex items-center gap-2 text-gray-900 transition-opacity duration-200 hover:underline hover:opacity-90 dark:text-gray-100"
                    >
                      Learn more <ExportIcon className="h-auto w-3" />
                    </a>
                  </div>
                </div>
                <p className="leading-loose text-gray-600 dark:text-gray-400">
                  In order to vote on SnapShot, you need to have ptPOOL tokens.
                  You can obtain them by depositing your token icon POOL into
                  the POOL Pool . By doing so, you will be eligible to vote
                  gas-free and have a chance to win a weekly prize.
                </p>
              </div>
            </>
          </TabPanel>
        </ParamTab>
      </section>
    </>
  );
}
