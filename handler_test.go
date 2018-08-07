package main

import (
	"testing"
	"time"

	"github.com/ilgooz/go-service"
	"github.com/ilgooz/go-service/mesgtest"
	"github.com/mesg-foundation/service-bitcoin/models"
	"github.com/mesg-foundation/service-bitcoin/providers"
	"github.com/stvp/assert"
)

const token = "token"
const endpoint = "endpoint"

func TestHandler(t *testing.T) {
	testServer := mesgtest.NewServer()
	go testServer.Start()
	time.Sleep(time.Second)

	blockchain := providers.NewBlockchainInfoProvider()

	service, err := mesg.New(
		mesg.DialOption(testServer.Socket()),
		mesg.TokenOption(token),
		mesg.EndpointOption(endpoint),
	)
	assert.Nil(t, err)
	assert.NotNil(t, service)
	NewHandler(service, blockchain).StartListen()

	addr := new(models.Address)
	_, ex, err := testServer.Execute(taskGetAddress, "12MQHWqF33Ji9rGEedCJmv4CkPNeAubHoJ")
	assert.Nil(t, err)
	err = ex.Decode(addr)
	assert.Nil(t, err)
	assert.Equal(t, "0ed3e1d37d6c8b2a9d2074ea84fe0588a79d64c6", addr.Hash160)

	block := new(models.Block)
	_, ex, err = testServer.Execute(taskBlockData, "00000000000000000194a121746fe0f44aa4c8d0a8be617090b5a06f13af3807")
	assert.Nil(t, err)
	err = ex.Decode(block)
	assert.Nil(t, err)
	assert.NotEqual(t, "", block.NTx)

	tx := new(models.TX)
	_, ex, err = testServer.Execute(taskTXData, "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da")
	assert.Nil(t, err)
	err = ex.Decode(tx)
	assert.Nil(t, err)
	assert.NotEqual(t, "", tx.Hash)

}
