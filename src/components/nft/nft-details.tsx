import cn from 'classnames';
import { StaticImageData } from 'next/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Image from '@/components/ui/image';
import AuctionCountdown from '@/components/nft/auction-countdown';
import AnchorLink from '@/components/ui/links/anchor-link';
import Button from '@/components/ui/button';
import Avatar1 from '@/assets/images/avatar/3.png';
import { useModal } from '@/components/modal-views/context';
import Avatar from '@/components/ui/avatar';
import { NextSeo } from 'next-seo';
import DaoList from '@/components/dao/dao-list';
import { getVotesByStatus } from '@/data/static/vote-data';
import routes from '@/config/routes';
import { ExportIcon } from '@/components/icons/export-icon';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { WalletContext } from '@/lib/hooks/use-connect';
import votePool from '@/assets/images/vote-pool.svg';
import { daos } from '@/data/static/dao-data';

interface NftFooterProps {
  className?: string;
  currentBid: any;
  auctionTime: Date | string | number;
  isAuction?: boolean;
  price?: number;
}

function NftFooter({
  className = 'md:hidden',
  currentBid,
  auctionTime,
  isAuction,
  price,
}: NftFooterProps) {
  const { openModal } = useModal();
  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 bg-body dark:bg-dark md:-mx-2',
        className
      )}
    >
      <div className="-mx-4 border-t-2 border-gray-900 px-4 pt-4 pb-5 dark:border-gray-700 sm:-mx-6 sm:px-6 md:mx-2 md:px-0 md:pt-5 lg:pt-6 lg:pb-7">
        {isAuction && (
          <div className="flex gap-4 pb-3.5 md:pb-4 xl:gap-5">
            <div className="block w-1/2 shrink-0 md:w-2/5">
              <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
                Current bid <span className="md:hidden">by</span>{' '}
                <AnchorLink
                  href={currentBid?.authorSlug ?? '#'}
                  className="normal-case text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden"
                >
                  @{currentBid?.name}
                </AnchorLink>
              </h3>
              <div className="text-lg font-medium -tracking-wider md:text-xl xl:text-2xl">
                {currentBid?.amount} ETH
              </div>
              <AnchorLink
                href={currentBid?.authorSlug ?? '#'}
                className="mt-2 hidden items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:inline-flex"
              >
                <div className="h-6 w-6 rounded-full ltr:mr-2 rtl:ml-2">
                  <Image src={Avatar1} alt="avatar" width={24} height={24} />
                </div>
                @{currentBid?.name}
              </AnchorLink>
            </div>
            <div className="block w-1/2 shrink-0 md:w-3/5">
              <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
                Auction ends in
              </h3>
              <AuctionCountdown date={auctionTime} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button shape="rounded">
            {isAuction ? 'PLACE A BID' : `BUY FOR ${price} ETH`}
          </Button>
          <Button
            shape="rounded"
            variant="solid"
            color="gray"
            className="dark:bg-gray-800"
            onClick={() => openModal('SHARE_VIEW')}
          >
            SHARE
          </Button>
        </div>
      </div>
    </div>
  );
}

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
  const { address, disconnectWallet, balance } = useContext(WalletContext);

  const router = useRouter();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');

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
