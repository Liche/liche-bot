export HUBOT_HIPCHAT_JID=""
export HUBOT_HIPCHAT_PASSWORD=""
#export HUBOT_HIPCHAT_ROOMS=""
#export HUBOT_HIPCHAT_ROOMS_BLACKLIST=""
#export HUBOT_HIPCHAT_JOIN_ROOMS_ON_INVITE="true"
#export HUBOT_HIPCHAT_JOIN_PUBLIC_ROOMS="false"
#export HUBOT_HIPCHAT_HOST=""
#export HUBOT_HIPCHAT_XMPP_DOMAIN="btf.hipchat.com"
#export HUBOT_HIPCHAT_RECONNECT="true"

# Fill this value to the LicheBot root directory
HOME_DIRECTORY='';

cd $HOME_DIRECTORY;

./bin/hubot --adapter hipchat
