let SOCKET_IO_HOST = ''

if (process.NODE_ENV !== 'production') {
  SOCKET_IO_HOST = 'http://localhost:3333'
} else {
  SOCKET_IO_HOST = 'http://34.87.30.146'
}

export default SOCKET_IO_HOST