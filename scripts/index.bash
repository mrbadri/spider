source ./scripts/colors.bash
source ./scripts/constant.bash
source ./scripts/getUsername.bash
source ./scripts/suggestions.bash
source ./scripts/clearUsers.bash
source ./scripts/sendMail.bash
source ./scripts/getInfo.bash


echo
echo -e "Hi, I'm $PURPLE$BOLD"Spider"$NONE"
suggestions

while true; do
    read -p "$(echo -e Please Enter My $CYAN$BOLD"Task"$NONE:) " task
    
    case $task in
        get-username ) getUsername exit;;
        
        get-info) getInfo exit;;
        
        send-mail) sendMail exit;;
        
        show-users ) TASK=showUsers node src/index.js exit;;
        
        show-counts ) TASK=showCounts node src/index.js exit;;
        
        clear-users ) clearUsers exit;;
        
        
        
        # if dont enter correct answer
        * ) suggestions ;;
    esac
done