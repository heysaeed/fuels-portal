import { useMemo } from 'react';

import { BridgeStatus } from '../machines';

import { useBridge } from './useBridge';

import { getChainName } from '~/systems/Chains';

export function useBridgeButton() {
  const {
    handlers,
    fromNetwork,
    toNetwork,
    status,
    isLoading,
    isLoadingConnectFrom,
    isLoadingConnectTo,
  } = useBridge();

  const button = useMemo(() => {
    if (status === BridgeStatus.waitingConnectFrom) {
      return {
        text: status.replace('From', getChainName(fromNetwork)),
        isLoading: isLoadingConnectFrom,
        action: handlers.connectFrom,
      };
    }

    if (status === BridgeStatus.waitingConnectTo) {
      return {
        text: status.replace('To', getChainName(toNetwork)),
        isLoading: isLoadingConnectTo,
        action: handlers.connectTo,
      };
    }

    if (status === BridgeStatus.ready) {
      return {
        text: status,
        isLoading,
        action: handlers.startBridging,
      };
    }

    return {
      text: status,
      isDisabled: true,
    };
  }, [
    status,
    fromNetwork,
    toNetwork,
    handlers.startBridging,
    handlers.connectFrom,
    handlers.connectTo,
    isLoadingConnectFrom,
    isLoadingConnectTo,
  ]);

  const { action, ...bridgeButton } = button;

  return {
    ...bridgeButton,
    handlers: {
      action,
    },
  };
}