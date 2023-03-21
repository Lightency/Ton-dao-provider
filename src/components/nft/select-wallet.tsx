import { useModal } from '@/components/modal-views/context';
import React, { useEffect, useRef, useContext } from 'react';
import QRCode from 'qrcode';
import { WalletTonContext } from '@/lib/hooks/use-connect-ton';

export default function SelectWallet({ ...props }) {
  const { link, isConnected, sessionData, walletConfig } =
    useContext(WalletTonContext);
  const canvasRef = useRef(null);
  const { closeModal } = useModal();

  useEffect(() => {
    if (isConnected) {
      closeModal();
    }
  }, [isConnected]);

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
        <br></br>
        {link && <canvas ref={canvasRef} />}
      </div>
      <div
        style={{ justifyContent: 'center' }}
        className="mt-12 flex h-14 w-full cursor-pointer items-center justify-between rounded-lg bg-gradient-to-l from-[#2563eb63] to-[#2a52be] px-4 text-base text-white transition-all hover:-translate-y-0.5"
      >
        {link && (
          <a target="_blank" href={link} rel="noreferrer">
            Connect
          </a>
        )}
      </div>
    </div>
  );
}
