import { Details, SunriseStakeClient } from '@sunrisestake/client';
import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { AnchorProvider } from '@coral-xyz/anchor';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

type Props = { network: WalletAdapterNetwork } & PropsWithChildren;

const defaults = {
    details: undefined,
    client: undefined,
    loading: false,
    error: undefined,
};

type Output = {
    details?: Details;
    client?: SunriseStakeClient;
    loading: boolean;
    error?: Error;
};

const SunriseClientContext = createContext<Output>(defaults);

export const SunriseClientProvider: FC<Props> = ({ network, children }) => {
    const [details, setDetails] = useState<Details>();
    const [client, setClient] = useState<SunriseStakeClient>();
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!wallet) {
            return;
        }
        (async () => {
            setLoading(true);
            const provider = new AnchorProvider(connection, wallet, {
                commitment: 'confirmed',
            });

            const sunriseClient = await SunriseStakeClient.get(provider, network);
            setClient(sunriseClient);

            await sunriseClient.details().then(setDetails);
        })()
            .catch(setError)
            .finally(() => setLoading(false));
    }, [wallet?.publicKey.toBase58()]);

    return (
        <SunriseClientContext.Provider value={{ details, client, loading, error }}>
            {children}
        </SunriseClientContext.Provider>
    );
};

export const useSunrise = (): Output => useContext(SunriseClientContext);
