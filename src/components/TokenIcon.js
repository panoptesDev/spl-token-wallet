import { useConnectionConfig } from '../utils/connection';
import { TOKENS } from '../utils/tokens/names';
import React, { useState } from 'react';

export default function TokenIcon({ mint, url, tokenName, size = 20 }) {
  const { endpoint } = useConnectionConfig();

  const [hasError, setHasError] = useState(false);

  if (!url) {
    if (mint === null) {
      url =
        'https://github.com/Fair-Exchange/safecoinwiki/blob/master/Logos/Safecoin_Logo_Small_Transparent.png';
    } else {
      url = TOKENS?.[endpoint]?.find(
        (token) => token.mintAddress === mint?.toBase58(),
      )?.icon;
    }
  }

  if (hasError || !url) {
    return null;
  }

  return (
    <img
      src={url}
      title={tokenName}
      alt={tokenName}
      style={{
        width: size,
        height: size,
        backgroundColor: 'white',
        borderRadius: size / 2,
      }}
      onError={() => setHasError(true)}
    />
  );
}
