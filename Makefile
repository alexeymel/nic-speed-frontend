OUTPUT_PATH ?= ./build

TARGET ?= nic-speed-frontend
APP_VERSION ?= 0.1.0

SAVE_DOCKER_ON_BUILD ?= false

# Make output path
make-build-path:
	mkdir $(OUTPUT_PATH) || true

# Build docker image
build-docker:
	ls nginx.conf || cp nginx.conf.defaults nginx.conf
	docker build --tag=$(TARGET):$(APP_VERSION) \
		--build-arg build_version=$(git rev-parse HEAD) \
		-f Dockerfile .

# Save docker image
save-docker:
	docker image save -o $(OUTPUT_PATH)/$(TARGET)-$(APP_VERSION).image.docker $(TARGET):$(APP_VERSION)

# Build project
all: make-build-path build-docker
ifeq ($(SAVE_DOCKER_ON_BUILD), true)
	save-docker
endif

# Clean
clean:
	rm -rf $(OUTPUT_PATH)
	rm -rf nginx.conf