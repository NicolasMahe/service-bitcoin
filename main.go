package main

import (
	"github.com/ilgooz/go-service"
	"github.com/mesg-foundation/service-bitcoin/providers"
)

func main() {

	service, err := mesg.New()
	if err != nil {
		panic(err)
	}

	handler := NewHandler(service, getProvider())
	handler.StartListen()
}

func getProvider() Provider {
	return providers.NewBlockchainInfoProvider()
}
