// Copyright (C) 2017 Electronic Arts Inc.  All rights reserved.

#pragma once

namespace cv { class Mat; }

#include <tbb/concurrent_queue.h>
#include <boost/thread.hpp>
#include "video_writer.hpp"

struct AVFrame;
struct AVPacket;

class AviVideoWriter : public VideoWriter
{
public:
	AviVideoWriter(const char * filename, int framerate, int width, int height, int bpp);
	~AviVideoWriter();

	bool addFrame(const cv::Mat& img, double ts) override;
	void close() override;
	int buffers_used(int type) const override;

	static int frame_row_alignment() { return s_frame_row_alignment; }

protected:
	AVFrame* allocate_frame();
	void deallocate_frame(AVFrame** frame);

	void encodingThread();
	void writingThread();

private:
	int m_frame_counter;
	int m_framerate;
	int m_width;
	int m_height;
	int m_bpp;
	bool m_closed;

	static bool s_global_init;
	static int s_frame_row_alignment;

	struct AVStream* m_av_stream;
	struct AVFormatContext* m_fmt_ctx;
	struct AVCodecContext* m_c;
	struct AVDictionary* m_format_opts;

	tbb::concurrent_bounded_queue<AVFrame*> m_frame_queue;
	tbb::concurrent_bounded_queue<AVPacket*> m_paquet_queue;

	boost::thread pipeline_thread;
};
