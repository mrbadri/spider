function suggestions() {
    echo
    echo -e "$BOLD"Suggestions:"$NONE"
    for VARIABLE in $tasks
    do
        echo -e "            $YELLOW$VARIABLE$NONE            "
    done
    echo
}