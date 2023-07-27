# SPDX-License-Identifier: Apache-2.0
#
# Copyright © 2017-2019 WireGuard LLC. All Rights Reserved.

BUILDDIR ?= $(CURDIR)/build
DESTDIR ?= $(CURDIR)/out

NDK_GO_ARCH_MAP_x86 := 386
NDK_GO_ARCH_MAP_x86_64 := amd64
NDK_GO_ARCH_MAP_arm := arm
NDK_GO_ARCH_MAP_arm64 := arm64
NDK_GO_ARCH_MAP_mips := mipsx
NDK_GO_ARCH_MAP_mips64 := mips64x

CLANG_FLAGS := --target=$(ANDROID_LLVM_TRIPLE) --gcc-toolchain=$(ANDROID_TOOLCHAIN_ROOT) --sysroot=$(ANDROID_SYSROOT)
export CGO_CFLAGS := $(CLANG_FLAGS) $(CFLAGS)
export CGO_LDFLAGS := $(CLANG_FLAGS) $(LDFLAGS)
export CC := $(ANDROID_C_COMPILER)
export GOARCH := $(NDK_GO_ARCH_MAP_$(ANDROID_ARCH_NAME))
export GOOS := android
export CGO_ENABLED := 1

default: $(DESTDIR)/libwg-go.so

GOBUILDARCH := $(NDK_GO_ARCH_MAP_$(shell echo %PROCESSOR_ARCHITECTURE%))
GOBUILDOS := windows
GOBUILDVERSION := 1.12
GOBUILDTARBALL := https://dl.google.com/go/go$(GOBUILDVERSION).windows-$(GOBUILDARCH).zip
GOBUILDVERSION_NEEDED := go version go$(GOBUILDVERSION) $(GOBUILDOS)/$(GOBUILDARCH)
export GOROOT := $(BUILDDIR)/goroot
export GOPATH := $(BUILDDIR)/gopath
export PATH := $(GOROOT)/bin:$(PATH)
GOBUILDVERSION_CURRENT := $(shell $(GOROOT)/bin/go version 2>/dev/null)

$(GOROOT)/bin/go:
	@rmdir /s /q "$(GOROOT)" 2>nul & mkdir "$(GOROOT)"
	curl -o go.zip "$(GOBUILDTARBALL)"
	expand -F:* go.zip "$(GOROOT)"
	del /F go.zip

$(shell type "$(BUILDDIR)/.gobuildversion" 2>nul | findstr /C:"$(GOBUILDVERSION_CURRENT)" >nul || del /F "$(DESTDIR)\libwg-go.so")

check_environment:
	@echo "Checking Go version..."
	@$(GOROOT)/bin/go version || (echo "Error: Go is not installed or GOROOT is not set correctly."; exit 1)

	@echo "Checking GOPATH..."
	@echo "GOPATH=$(GOROOT)"
	@if [ -z "$(GOPATH)" ]; then echo "Error: GOPATH is not set."; exit 1; fi

	@echo "Checking NDK configuration..."
	@if [ -z "$(NDK_GO_ARCH_MAP_$(ANDROID_ARCH_NAME))" ]; then echo "Error: NDK_GO_ARCH_MAP_$(ANDROID_ARCH_NAME) is not set."; exit 1; fi

	@echo "Checking C Compiler..."
	@if [ -z "$(CC)" ]; then echo "Error: C Compiler (CC) is not set."; exit 1; fi

	@echo "Environment checks passed."

$(DESTDIR)/libwg-go.so: check_environment $(GOROOT)/bin/go
	go get -tags windows || (attrib -r "$(GOPATH)\pkg\mod\*" /s /d & rmdir /s /q "$(GOPATH)\pkg\mod" & exit 1)
	attrib -r "$(GOPATH)\pkg\mod\*" /s /d
	go build -tags linux -ldflags="-X main.socketDirectory=/data/data/$(ANDROID_PACKAGE_NAME)/cache/wireguard" -v -o "$@" -buildmode c-shared
	go version > "$(BUILDDIR)/.gobuildversion"




# SPDX-License-Identifier: Apache-2.0
#
# Copyright © 2017-2023 WireGuard LLC. All Rights Reserved.

# BUILDDIR := $(CURDIR)/build
# DESTDIR := $(CURDIR)/out

# NDK_GO_ARCH_MAP_x86 := 386
# NDK_GO_ARCH_MAP_x86_64 := amd64
# NDK_GO_ARCH_MAP_arm := arm
# NDK_GO_ARCH_MAP_arm64 := arm64
# NDK_GO_ARCH_MAP_mips := mipsx
# NDK_GO_ARCH_MAP_mips64 := mips64x

# comma := ,
# CLANG_FLAGS := --target=$(TARGET) --sysroot=$(SYSROOT)
# export CGO_CFLAGS := $(CLANG_FLAGS) $(subst -mthumb,-marm,$(CFLAGS))
# export CGO_LDFLAGS := $(CLANG_FLAGS) $(patsubst -Wl$(comma)--build-id=%,-Wl$(comma)--build-id=none,$(LDFLAGS)) -Wl,-soname=libwg-go.so
# export GOARCH := $(NDK_GO_ARCH_MAP_$(ANDROID_ARCH_NAME))
# export GOOS := android
# export CGO_ENABLED := 1

# GO_VERSION := 1.20.3
# GO_PLATFORM := $(NDK_GO_ARCH_MAP_$(PROCESSOR_ARCHITECTURE))
# GO_TARBALL := go$(GO_VERSION).$(GO_PLATFORM).tar.gz
# GO_HASH_darwin-amd64 := c1e1161d6d859deb576e6cfabeb40e3d042ceb1c6f444f617c3c9d76269c3565
# GO_HASH_darwin-arm64 := 86b0ed0f2b2df50fa8036eea875d1cf2d76cefdacf247c44639a1464b7e36b95
# GO_HASH_linux-amd64 := 979694c2c25c735755bf26f4f45e19e64e4811d661dd07b8c010f7a8e18adfca

# default: $(DESTDIR)\libwg-go.so

# $(GRADLE_USER_HOME)\caches\golang\$(GO_TARBALL):
# 	mkdir "$(subst /,\,$(GRADLE_USER_HOME))\caches\golang" 2> NUL
# 	echo. >> "$@.lock"
# 	( \
# 		if exist "$@" ( \
# 			exit 0 \
# 		) else ( \
# 			curl.exe -o "$@.tmp" "https://dl.google.com/go/$(GO_TARBALL)" && \
# 			PowerShell -command "& {Get-FileHash \"$@.tmp\" -Algorithm SHA256 | Select-String -Pattern \"$(GO_HASH_$(GO_PLATFORM))\"}" && \
# 			move "$@.tmp" "$@" \
# 		) \
# 	) || ( \
# 		del "$@.tmp" \
# 	)

# $(BUILDDIR)/go-$(GO_VERSION)\.prepared: $(GRADLE_USER_HOME)\caches\golang\$(GO_TARBALL)
# 	mkdir -p "$(dir $@)"
# 	: >> "$@.lock"
# 	( \
# 		if exist "$@" ( \
# 			exit 0 \
# 		) else ( \
# 			tar -C "$(subst /,\,$(dir $@))" -xf "$^" && \
# 			> "$(subst /,\,$(dir $@))\goruntime-boottime-over-monotonic.diff" && \
# 			touch "$@" \
# 		) \
# 	)

# $(DESTDIR)\libwg-go.so: PATH := $(BUILDDIR)\go-$(GO_VERSION)\bin;$(PATH)
# $(DESTDIR)\libwg-go.so: $(BUILDDIR)\go-$(GO_VERSION)\.prepared go.mod
# 	go build -tags linux -ldflags="-X golang.zx2c4.com/wireguard/ipc.socketDirectory=/data/data/$(ANDROID_PACKAGE_NAME)/cache/wireguard -buildid=" -v -trimpath -buildvcs=false -o "$@" -buildmode c-shared

# .DELETE_ON_ERROR: