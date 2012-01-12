webdriver = require 'webdriverjs'

task 'test', 'run selenium tests', (options) ->
    client = webdriver.remote({ port: 99.0 })
    client
        .init()
        .url("http://google.com")
        .end()


