<h1 align="center">
    📝 Note Rack
</h1>

## 🌳 Features
* Basic Markdown Syntax
    * H1, H2, H3, H4, H5
    * Quotes
* Custom Markdown Syntax
    * Call Outs
* Page Management
    * Sub Pages
    * Page Navigation
    * Page Styling
* Exporting
    * [PDF Exporting](./images/Note%20Rack%20Page.pdf)

## 📦 Installation
1. Download the repo
    * Clone the repo
        ```bash
        git clone https://github.com/Eroxl/Note-Rack.git
        ```
    * Or download the [zip file](https://github.com/Eroxl/Note-Rack/archive/refs/heads/main.zip)
1. With Docker
    1. Install Docker and Docker Compose
        - [Docker](https://docs.docker.com/get-docker/)
        - [Docker Compose](https://docs.docker.com/compose/install/)

    2. Navigate to the repository
        * If you cloned the repo
            ```bash
            cd ./note-rack
            ```
        * If you downloaded the zip file
            1. Locate the zip file
            2. Unzip the file
            3. Navigate to the folder
                ```bash
                cd ./Note-Rack-main
                ```

    3. Copy the server environment file and fill in the values
        ```bash
        cd ./backend && \
        cp .env.example .env
        ```

    4. Copy the client environment file and fill in the values
        ```bash
        cd ../web && \
        cp ./src/.env.example ./src/.env.local
        ```

    5. Run the Docker Compose file
        ```bash
        docker-compose up --build
        ```

    6. Navigate to the web application at [http://127.0.0.1:3000](http://127.0.0.1:3000)

2. Without Docker
    1. Install Node.js
        - [Node.js](https://nodejs.org/en/download/)

    2. Install Yarn
        - [Yarn](https://classic.yarnpkg.com/en/docs/install)

    3. Install Dependencies
        ```bash
        cd ./backend && \
        yarn install && \
        cd ../web && \
        yarn install
        ```
    
    4. Setup a MongoDB database
        - Local
            - [MongoDB](https://docs.mongodb.com/manual/installation/)
        - Cloud
            - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

    5. Setup a Supertokens instance
        - Locally
            - [Supertokens](https://supertokens.com/docs/thirdparty/pre-built-ui/setup/core/without-docker)
        - Cloud
            - [Supertokens](https://supertokens.com/docs/thirdparty/pre-built-ui/setup/core/saas-setup)
    
    6. Copy the server environment file and fill in the values
        ```bash
        cd ./backend && \
        cp .env.example .env
        ```

    7. Copy the client environment file and fill in the values
        ```bash
        cd ../web && \
        cp .env.example .env.local
        ```

    8. Run the server
        ```bash
        cd ../backend && \
        yarn dev
        ```

    9. Run the client
        ```bash
        cd ../web && \
        yarn dev
        ```

## 🎹 Keybinds
- Headings
    - `#` - H1
    - `##` - H2
    - `###` - H3
    - `####` - H4
    - `#####` - H5
- Other
    - `>` Quote
    - `|` Callout
    -  `[[ Page Name ]]` Page ("Page Name" can be any string)

## 🔬 Examples

#### Current State (dark)
<img src="./images/Desktop_Current_State_Dark.png" width="500">

#### Current State (light)
<img src="./images/Desktop_Current_State.png" width="500">
