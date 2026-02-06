<h1 align="center">
  <a href="https://mimic.fi">
    <img src="https://www.mimic.fi/logo.png" alt="Mimic" width="200">
  </a>
</h1>

<h4 align="center">Developer platform for blockchain apps</h4>

<p align="center">
  <a href="https://discord.mimic.fi">
    <img src="https://img.shields.io/badge/discord-join-blue" alt="Discord">
  </a>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#scope">Scope</a> •
  <a href="#setup">Setup</a> •
  <a href="#license">License</a>
</p>

---

## Overview

This repository demonstrates how to upgrade an existing EOA into a **Mimic EIP-7702 smart account** using a single command-line transaction.

The upgrade enables EOAs to participate seamlessly in automation flows without deploying a separate smart account contract or requiring repeated, granular approvals for each automated action.

## Scope

This example is chain-agnostic and uses Ethereum-compatible networks as the reference execution environment.

While Ethereum and major L2s are commonly used for clarity and familiarity, the same upgrade flow applies to any network that supports EIP-7702-style authorization transactions.

The only network-specific inputs are:

* The RPC endpoint
* The private key of the EOA to be upgraded
* The Mimic Smart Account implementation address

No other changes to the upgrade logic are required.

## Setup

To set up this project you’ll need [git](https://git-scm.com) and [yarn](https://classic.yarnpkg.com) installed.

From your command line:

```bash
# Clone the repository
git clone https://github.com/mimic-fi/mimic-7702-upgrade

# Enter the repository
cd mimic-7702-upgrade

# Install dependencies
yarn
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill in the following variables:

* `RPC_URL` – RPC endpoint for the target chain
* `PRIVATE_KEY` – EOA private key to be upgraded
* `SMART_ACCOUNT_ADDRESS` – Official Mimic EIP-7702 Smart Account implementation address

> ⚠️ **Security note**
> EIP-7702 authorization is powerful. Only use Smart Account addresses obtained from official Mimic sources.

### Upgrade your EOA

```bash
yarn upgrade-7702
```

This sends a zero-value self-transaction containing an EIP-7702 authorization that upgrades the EOA to a Mimic smart account.

### Check basic status

```bash
yarn status
```

This prints basic wallet and network information and provides helpful explorer links for manual verification.

## License

MIT

---

> Website [mimic.fi](https://mimic.fi)  · 
> Docs [docs.mimic.fi](https://docs.mimic.fi)  · 
> GitHub [@mimic-fi](https://github.com/mimic-fi)  · 
> Twitter [@mimicfi](https://twitter.com/mimicfi)  · 
> Discord [mimic](https://discord.mimic.fi)
