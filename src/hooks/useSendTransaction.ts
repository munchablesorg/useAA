import { useSmartAccount } from "@/hooks"
import type { MutationOptionsWithoutMutationFn } from "@/hooks"

import { type PartialOptions, mergeOptions } from "@/utils"
import type { Transaction, UserOpResponse } from "@biconomy/account"
import { useMutation } from "@tanstack/react-query"

export type UseSendTransactionArgs = {
  transactions: Transaction | Transaction[]
  options?: PartialOptions
}

export const useSendTransaction = (
  mutationArgs?: MutationOptionsWithoutMutationFn
) => {
  const { smartAccountClient, queryClient } = useSmartAccount()

  const useSendTransactionMutation = useMutation(
    {
      mutationFn: (
        variables: UseSendTransactionArgs
      ): Promise<UserOpResponse> => {
        if (!smartAccountClient) {
          throw new Error("No smart account found")
        }
        const { transactions, options } = variables

        return smartAccountClient.sendTransaction(
          transactions,
          mergeOptions(options)
        )
      },
      ...mutationArgs
    },
    queryClient
  )

  return useSendTransactionMutation
}
