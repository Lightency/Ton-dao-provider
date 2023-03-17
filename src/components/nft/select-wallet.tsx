import { useModal } from '@/components/modal-views/context';
import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { TonhubConnector } from 'ton-x';

export default function SelectWallet({ ...props }) {
  const connector = new TonhubConnector({ network: 'mainnet' });
  const [link, setLink] = useState('');
  const canvasRef = useRef(null);
  const { closeModal } = useModal();

  useEffect(() => {
    const createNewSession = async () => {
      let session = await connector.createNewSession({
        name: 'github',
        url: 'https://cbf0-41-62-205-40.eu.ngrok.io',
      });
      // Session ID, Seed and Auth Link
      const sessionId = session.id;
      const sessionSeed = session.seed;
      const sessionLink = session.link;
      setLink(sessionLink);
      console.log(
        sessionId,
        sessionSeed,
        sessionLink,
        connector.getSessionState(sessionId)
      );
    };
    createNewSession();
  }, []);

  useEffect(() => {
    if (link && canvasRef) {
      QRCode.toCanvas(
        canvasRef.current,
        // QR code doesn't work with an empty string
        // so we are using a blank space as a fallback
        link || ' ',
        (error: any) => error && console.error(error)
      );
    }
  }, [link]);

  return (
    <div
      className="relative z-50 mx-auto w-[440px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark"
      {...props}
    >
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Connect Wallet
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {' '}
        <span>Scan this QR code with Tonhub</span>
        {link && <canvas ref={canvasRef} />}
      </div>
      <div className="mt-12 flex h-14 w-full cursor-pointer items-center justify-between rounded-lg bg-gradient-to-l from-[#ffdc24] to-[#ff5c00] px-4 text-base text-white transition-all hover:-translate-y-0.5">
        {link && (
          <a target="_blank" href={link} rel="noreferrer">
            Connect
          </a>
        )}
      </div>
    </div>
  );
}
