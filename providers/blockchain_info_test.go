package providers

import (
	"testing"

	"github.com/stvp/assert"
)

func TestBlockchainInfo(t *testing.T) {
	provider := NewBlockchainInfoProvider()

	latestBlock, err := provider.GetLatestBlock()
	assert.Nil(t, err)
	assert.NotNil(t, latestBlock)

	t.Log(latestBlock.Hash)

	addr, err := provider.GetAddress("12MQHWqF33Ji9rGEedCJmv4CkPNeAubHoJ")
	assert.Nil(t, err)
	assert.NotNil(t, addr)

	t.Log(addr.TotalReceived)

	tx, err := provider.GetTX("c8844573211707a2d4c0eb28ec581c921fa7a2af438ef8b2c2319c5960a48c38")
	assert.Nil(t, err)
	assert.NotNil(t, tx)

	t.Log(tx.Balance)

	block, err := provider.GetBlock("00000000000000000194a121746fe0f44aa4c8d0a8be617090b5a06f13af3807")
	assert.Nil(t, err)
	assert.NotNil(t, block)

	t.Log(block.MrklRoot)
}
