package providers

import (
	"encoding/json"

	"github.com/mesg-foundation/service-bitcoin/models"
	"github.com/vasilyukvasiliy/blockchain"
)

// BlockchainInfo
type BlockchainInfo struct {
	client *blockchain.Client
}

// Parser to parse into our models
type Parser interface {
	MarshalJSON() ([]byte, error)
}

// NewBlockchainInfoProvider is our provider for blockchain info API
func NewBlockchainInfoProvider() *BlockchainInfo {
	return &BlockchainInfo{
		client: blockchain.New(),
	}
}

// GetLatestBlock receive the latest block of the main chain
func (b *BlockchainInfo) GetLatestBlock() (*models.LatestBlock, error) {
	latestBlock := new(models.LatestBlock)
	block, err := b.client.GetLatestBlock()
	if err != nil {
		return nil, err
	}

	err = b.getModel(block, latestBlock)
	return latestBlock, err
}

// GetBlock get the block by the hash
func (b *BlockchainInfo) GetBlock(hash string) (*models.Block, error) {
	blockData := new(models.Block)
	block, err := b.client.GetBlock(hash)
	if err != nil {
		return nil, err
	}

	err = b.getModel(block, blockData)
	return blockData, err
}

// GetAddress obtains information about the address
func (b *BlockchainInfo) GetAddress(address string) (*models.Address, error) {
	addressData := new(models.Address)
	addr, err := b.client.GetAddress(address)
	if err != nil {
		return nil, err
	}

	err = b.getModel(addr, addressData)
	return addressData, err
}

// GetTX get the transaction on its hash
func (b *BlockchainInfo) GetTX(id string) (*models.TX, error) {
	txData := new(models.TX)
	tx, err := b.client.GetTransaction(id)
	if err != nil {
		return nil, err
	}
	err = b.getModel(tx, txData)
	return txData, err
}

func (b *BlockchainInfo) getModel(p Parser, model interface{}) error {
	buff, err := p.MarshalJSON()
	if err != nil {
		return err
	}
	return json.Unmarshal(buff, model)
}
