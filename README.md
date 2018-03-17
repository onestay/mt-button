# Marathon-Tools button

Button interface for Marathon-Tools used to communicate with the big ass buttons for starting and stopping time.
## Getting Started

```
yarn
node index.js
```
It will create the WebSocket connection and make http requests on localhost:3000

It will accept key inputs. 'g' or 'b' when the timer is stopped will start it. 'g' will stop player 1 and 'b' player 2.

### Prerequisites

You need to at least have the [Marathon-Tools API running](https://github.com/onestay/MarathonTools-API). It defaults to running on port 3001. Change the env var on the API to listen to port 3000 instead.

## Authors

* **Onestay** - *Initial work* - [Onestay](https://github.com/onestay)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
