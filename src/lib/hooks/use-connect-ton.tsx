import { useEffect, useState, createContext, ReactNode } from 'react';
import {
  TonhubConnector,
  TonhubSessionAwaited,
  TonhubWalletConfig,
} from 'ton-x';
import TonWeb from 'tonweb';

export const WalletTonContext = createContext<any>({});

export const WalletTonProvider = ({ children }: { children: ReactNode }) => {
  const connector = new TonhubConnector({ network: 'mainnet' });

  const [link, setLink] = useState<string | undefined>(undefined);
  const [sessionData, setSessionData] = useState<any | undefined>(undefined);
  const [walletConfig, setWalletConfig] = useState<any>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balance, setBalance] = useState<any>();

  useEffect(() => {
    const createNewSession = async () => {
      let session = await connector.createNewSession({
        name: 'github',
        url: 'https://cbf0-41-62-205-40.eu.ngrok.io',
      });
      const sessionLink = session.link;
      setLink(sessionLink);
      setSessionData(session);
    };
    createNewSession();
  }, [isConnected]);

  useEffect(() => {
    const awaitSession = async () => {
      const session: TonhubSessionAwaited = await connector.awaitSessionReady(
        sessionData.id,
        30 * 60 * 1000
      ); // 5 min timeout
      if (session.state === 'revoked' || session.state === 'expired') {
        console.log('REJECTED');
        // Handle revoked or expired session
      } else if (session.state === 'ready') {
        console.log('ACCEPTED');
        setIsConnected(true);
        // Handle session
        const walletConfig: TonhubWalletConfig = session.wallet;
        setWalletConfig(walletConfig);
        // You need to persist this values to work with this connection:
        // * sessionId
        // * sessionSeed
        // * walletConfig

        // You can check signed wallet config on backend using TonhubConnector.verifyWalletConfig.
        // walletConfig is cryptographically signed for specific session and other parameters
        // you can safely use it as authentication proof without the need to sign something.
        const correctConfig: boolean = TonhubConnector.verifyWalletConfig(
          sessionData.id,
          walletConfig
        );

        // ...
      } else {
        throw new Error('Impossible');
      }
    };
    if (sessionData) {
      awaitSession();
    }
  }, [sessionData,isConnected]);

  useEffect(() => {
    const getBalance = async () => {
      const tonweb = new TonWeb();
      const balance = await tonweb.getBalance(walletConfig.address);
      setBalance(balance);
    };
    if (walletConfig) {
      getBalance();
    }
  }, [walletConfig]);

  const connectToWallet = () => {};
  const disconnectWallet = () => {
    setIsConnected(false)
  };

  return (
    <WalletTonContext.Provider
      value={{
        isConnected,
        walletConfig,
        sessionData,
        link,
        balance,
        connectToWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletTonContext.Provider>
  );
};
