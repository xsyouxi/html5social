/*
 * Copyright © 2010 MBTE Sweden AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import functionaltestplugin.FunctionalTestCase

import java.util.concurrent.CountDownLatch
import static java.util.concurrent.TimeUnit.SECONDS

import org.cometd.bayeux.Channel
import org.cometd.bayeux.client.ClientSessionChannel
import org.cometd.client.BayeuxClient
import org.cometd.client.transport.LongPollingTransport

class CometTests extends FunctionalTestCase
{
    def client
    
    void setUp()
    {
        super.setUp()
        client = new BayeuxClient(makeRequestURL(null, '/cometd').toString(), LongPollingTransport.create(null))
    }
    
    void tearDown()
    {
        super.tearDown()
        client.disconnect();
        client.waitFor(1000, BayeuxClient.State.DISCONNECTED);
    }

    void testHandshake()
    {
        client.handshake()
        assert client.waitFor(1000, BayeuxClient.State.CONNECTED) : 'handshake timeout'
    }
    
    // Simple echo service test to make sure that the bayeux bean was hooked up correctly to the CometdServlet.
    void testEcho()
    {
        def latch = new CountDownLatch(1)
        client.handshake()
        client.waitFor(1000, BayeuxClient.State.CONNECTED)
        def echoChannel = client.getChannel('/echo')
        echoChannel.subscribe({ channel, message ->
            if (message.data?.echo) {
                assert message.data.echo == 'hello'
                latch.countDown()
            }
        } as ClientSessionChannel.MessageListener)
        echoChannel.publish([echo: 'hello'])
        assert latch.await(4, SECONDS) : 'timeout'
    }
}
