// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CollegeFestTickets {

    enum TicketStatus { Valid, Used }

    struct Ticket {
        string eventName;
        string eventDate;
        uint256 ticketPrice;
        string additionalInfo;
        address owner;
        uint256 token;
        TicketStatus status;
    }

    struct Event {
        string name;
        string date;
        uint256 price;
        uint256 seatsAvailable;
        string additionalInfo;
        address[] ticketOwners;
    }

    address public admin;
    uint256 private nextTicketId = 1;
    uint256 private nextEventId = 1;
    mapping(uint256 => Ticket) private tickets;
    mapping(uint256 => Event) private events;
    mapping(address => uint256[]) private userTickets;

    event TicketCreated(uint256 ticketId, address owner);
    event TicketTransferred(uint256 ticketId, address from, address to);
    event TicketUsed(uint256 ticketId);
    event EventCreated(uint256 eventId, string eventName);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyTicketOwner(uint256 ticketId) {
        require(tickets[ticketId].owner == msg.sender, "Caller is not the ticket owner");
        _;
    }

    modifier ticketNotUsed(uint256 ticketId) {
        require(tickets[ticketId].status == TicketStatus.Valid, "Ticket already used");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createEvent(
        string memory name,
        string memory date,
        uint256 price,
        uint256 seatsAvailable,
        string memory additionalInfo
    ) public onlyAdmin {
        Event storage newEvent = events[nextEventId];
        newEvent.name = name;
        newEvent.date = date;
        newEvent.price = price;
        newEvent.seatsAvailable = seatsAvailable;
        newEvent.additionalInfo = additionalInfo;
        emit EventCreated(nextEventId, name);
        nextEventId++;
    }

    function buyTicket(uint256 eventId) public payable {
        Event storage eventDetail = events[eventId];
        require(eventDetail.seatsAvailable > 0, "No seats available");
        require(msg.value >= eventDetail.price, "Insufficient payment");

        Ticket storage newTicket = tickets[nextTicketId];
        newTicket.eventName = eventDetail.name;
        newTicket.eventDate = eventDetail.date;
        newTicket.ticketPrice = eventDetail.price;
        newTicket.additionalInfo = eventDetail.additionalInfo;
        newTicket.owner = msg.sender;
        newTicket.token = uint256(keccak256(abi.encodePacked(nextTicketId, eventDetail.name, eventDetail.date, eventDetail.price, eventDetail.additionalInfo, msg.sender)));
        newTicket.status = TicketStatus.Valid;

        userTickets[msg.sender].push(nextTicketId);
        eventDetail.ticketOwners.push(msg.sender);
        eventDetail.seatsAvailable--;

        emit TicketCreated(nextTicketId, msg.sender);
        nextTicketId++;
    }

    function transferTicket(uint256 ticketId, address newOwner) public onlyTicketOwner(ticketId) ticketNotUsed(ticketId) {
        Ticket storage ticket = tickets[ticketId];
        address previousOwner = ticket.owner;
        ticket.owner = newOwner;
        userTickets[newOwner].push(ticketId);
        emit TicketTransferred(ticketId, previousOwner, newOwner);
    }

    function useTicket(uint256 ticketId) public onlyTicketOwner(ticketId) ticketNotUsed(ticketId) {
        Ticket storage ticket = tickets[ticketId];
        ticket.status = TicketStatus.Used;
        emit TicketUsed(ticketId);
    }

    function getTicketDetails(uint256 ticketId) public view returns (string memory, string memory, uint256, string memory, TicketStatus) {
        Ticket storage ticket = tickets[ticketId];
        return (ticket.eventName, ticket.eventDate, ticket.ticketPrice, ticket.additionalInfo, ticket.status);
    }

    function getEventDetails(uint256 eventId) public view returns (string memory, string memory, uint256, uint256, string memory, address[] memory) {
        Event storage eventDetail = events[eventId];
        return (eventDetail.name, eventDetail.date, eventDetail.price, eventDetail.seatsAvailable, eventDetail.additionalInfo, eventDetail.ticketOwners);
    }

    function getUserTickets(address user) public view returns (uint256[] memory) {
        return userTickets[user];
    }
}
