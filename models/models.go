package models

type LatestBlock struct {
	Hash       string   `json:"hash"`
	Time       uint64   `json:"time"`
	BlockIndex uint64   `json:"block_index"`
	Height     uint64   `json:"height"`
	TxIndexes  []uint64 `json:"txIndexes"`
}

type Address struct {
	// Exist only in the case address
	Hash160 string `json:"hash160,omitempty"`

	Address       string `json:"address"`
	NTx           uint64 `json:"n_tx"`
	TotalReceived uint64 `json:"total_received"`
	TotalSent     uint64 `json:"total_sent"`
	FinalBalance  uint64 `json:"final_balance"`
	TXs           []TX   `json:"txs,omitempty"`

	// Exist only in the case multiaddr
	ChangeIndex  uint64 `json:"change_index,omitempty"`
	AccountIndex uint64 `json:"account_index,omitempty"`
}

type TX struct {
	Result      int64    `json:"result"`
	Ver         int64    `json:"ver"`
	Size        uint64   `json:"size"`
	Inputs      []Inputs `json:"inputs"`
	Time        uint64   `json:"time"`
	BlockHeight uint64   `json:"block_height"`
	TxIndex     uint64   `json:"tx_index"`
	VinSz       uint64   `json:"vin_sz"`
	Hash        string   `json:"hash"`
	VoutSz      uint64   `json:"vout_sz"`
	RelayedBy   string   `json:"relayed_by"`
	Out         []Out    `json:"out"`
	Weight      uint64   `json:"weight"`
	Fee         int64    `json:"fee"`
	LockTime    int64    `json:"lock_time"`
	DoubleSpend bool     `json:"double_spend"`
	Balance     int64    `json:"balance"`
	Rbf         bool     `json:"rbf"`
}

type Inputs struct {
	Sequence uint64  `json:"sequence"`
	Witness  string  `json:"witness"`
	PrevOut  PrevOut `json:"prev_out"`
	Script   string  `json:"script"`
}

type PrevOut struct {
	AddrTagLink string `json:"addr_tag_link"`
	AddrTag     string `json:"addr_tag"`
	Spent       bool   `json:"spent"`
	TxIndex     uint64 `json:"tx_index"`
	Type        uint64 `json:"type"`
	Addr        string `json:"addr"`
	Value       uint64 `json:"value"`
	N           uint64 `json:"n"`
	Script      string `json:"script"`
}

type Out struct {
	AddrTagLink string `json:"addr_tag_link"`
	AddrTag     string `json:"addr_tag"`
	Spent       bool   `json:"spent"`
	TxIndex     uint64 `json:"tx_index"`
	Type        uint64 `json:"type"`
	Addr        string `json:"addr"`
	Value       uint64 `json:"value"`
	N           uint64 `json:"n"`
	Script      string `json:"script"`
}

type Block struct {
	Hash       string `json:"hash"`
	Ver        int64  `json:"ver"`
	PrevBlock  string `json:"prev_block"`
	MrklRoot   string `json:"mrkl_root"`
	Time       uint64 `json:"time"`
	Bits       uint64 `json:"bits"`
	Fee        int64  `json:"fee"`
	Nonce      uint64 `json:"nonce"`
	NTx        uint64 `json:"n_tx"`
	Size       uint64 `json:"size"`
	BlockIndex uint64 `json:"block_index"`
	MainChain  bool   `json:"main_chain"`
	Height     uint64 `json:"height"`
	TX         []TX   `json:"tx"`
}
