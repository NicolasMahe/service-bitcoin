package main

import (
	"log"
	"time"

	"github.com/ilgooz/go-service"
	"github.com/mesg-foundation/service-bitcoin/models"
)

const (
	eventNewBlock  = "new_block"
	eventNewTX     = "new_tx"
	taskGetAddress = "get_address"
	taskBlockData  = "get_block"
	taskTXData     = "get_tx"
)

// Handler hold mesg service and blockchain provider
type Handler struct {
	service       *mesg.Service
	provider      Provider
	onLatestBlock chan *models.LatestBlock
}

// Provider is our blockchain interface to get data
type Provider interface {
	GetLatestBlock() (*models.LatestBlock, error)
	GetBlock(string) (*models.Block, error)
	GetAddress(string) (*models.Address, error)
	GetTX(string) (*models.TX, error)
}

// NewHandler returns handler for mesg service
func NewHandler(service *mesg.Service, provider Provider) *Handler {
	return &Handler{
		service:       service,
		onLatestBlock: make(chan *models.LatestBlock),
		provider:      provider,
	}
}

// StartListen for tasks
func (h *Handler) StartListen() {
	go h.service.Listen(
		mesg.NewTask(taskGetAddress, h.getAddress),
		mesg.NewTask(taskBlockData, h.getBlockData),
		mesg.NewTask(taskTXData, h.getTXData),
	)
}

// Stop the mesg service
func (h *Handler) Stop() error {
	return h.service.Close()
}

// StartEmit emits to mesg service
func (h *Handler) StartEmit() {
	go h.latestBlock()
	go func() {
		for {
			select {
			case block := <-h.onLatestBlock:
				if block == nil {
					break
				}
				if err := h.service.Emit(eventNewBlock, block); err != nil {
					log.Fatal(err)
				}
				break
			}
		}
	}()
}

func (h *Handler) latestBlock() {
	for {
		block, err := h.provider.GetLatestBlock()
		if err != nil {
			log.Fatal(err)
		}
		h.onLatestBlock <- block
		time.Sleep(5 * time.Second)
	}
}

func (h *Handler) getAddress(r *mesg.Request) mesg.Response {
	w := make(mesg.Response)
	var wallet string
	if err := r.Decode(&wallet); err != nil {
		log.Fatal(err)
	}
	address, err := h.provider.GetAddress(wallet)
	if err != nil {
		log.Fatal(err)
	}

	w[mesg.Key(r.Key)] = address
	return w
}

func (h *Handler) getBlockData(r *mesg.Request) mesg.Response {
	w := make(mesg.Response)
	var block string
	if err := r.Decode(&block); err != nil {
		log.Fatal(err)
	}
	blockData, err := h.provider.GetBlock(block)
	if err != nil {
		log.Fatal(err)
	}
	w[mesg.Key(r.Key)] = blockData
	return w
}

func (h *Handler) getTXData(r *mesg.Request) mesg.Response {
	w := make(mesg.Response)
	var tx string
	if err := r.Decode(&tx); err != nil {
		log.Fatal(err)
	}
	txData, err := h.provider.GetTX(tx)
	if err != nil {
		log.Fatal(err)
	}

	w[mesg.Key(r.Key)] = txData
	return w
}
