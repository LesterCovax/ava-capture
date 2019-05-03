// Copyright (C) 2017 Electronic Arts Inc.  All rights reserved.

#pragma once

#include <boost/thread/thread.hpp>

class CaptureNode;
struct HttpRequest;

class ServerUplink
{
public:
	ServerUplink(std::shared_ptr<CaptureNode> pNode,
		const char * SERVER, int PORT, const char * USERNAME, const char * PASSWORD, const char * GIT_REVISION);
	~ServerUplink();

	std::string sendKeepalive(bool request_params=false);

	bool isConnected() const {return running;}

private:
	bool running;
	void uplinkThread();
	void FillRequest(HttpRequest& req);

	std::string m_ip_address;
	std::string m_machine_name;

	std::string m_server;
	std::string m_port;
	std::string m_username;
	std::string m_password;

	std::string m_build_version;

	boost::thread m_thread;

	std::shared_ptr<CaptureNode> m_node;
};